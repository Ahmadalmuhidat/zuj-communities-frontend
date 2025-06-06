import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SocietyHeader from '@/Shared_Components/societies/SocietyHeader';
import Axios_Client from '@/config/axios';

interface JoinRequest {
  Request_ID: string;
  User_ID: string,
  User_Name: string,
  User_Email: string,
  User_Photo: string,
  // requestDate: string;
  Status: string;
}

export default function Society_Join_Requests() {
  const { id } = useParams();
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<JoinRequest | null>(null);
  const [filter, setFilter] = useState<string>('pending');

  const get_all_join_requests = async () => {
    const res = await Axios_Client.get("/societies/get_all_join_requests", {
      params: {
        society_id: id
      }
    })

    if (res.status == 201) {
      console.log(res.data.data);
      setRequests(res.data.data);
    }
  };

  const handleApprove = async (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.Request_ID === requestId ? { ...req, status: 'approved' as const } : req
    ));

    const res = await Axios_Client.post("/societies/approve_request", {
      request_id: requestId
    })

    if (res.status == 201) {
      setSelectedRequest(null);
    }
  };

  const handleReject = async (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.Request_ID === requestId ? { ...req, status: 'rejected' as const } : req
    ));

        const res = await Axios_Client.post("/societies/reject_request", {
      request_id: requestId
    })

    if (res.status == 201) {
      setSelectedRequest(null);
    }
  };

  const filteredRequests = requests.filter(req => 
    filter === 'all' || req.Status === filter
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    get_all_join_requests();
  }, []);

  return (
    <>
      <SocietyHeader societyId={id || '1'} />
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                  <p className="text-2xl font-semibold text-gray-900">{requests.filter(r => r.Status === 'pending').length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-semibold text-gray-900">{requests.filter(r => r.Status === 'approved').length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-full">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-2xl font-semibold text-gray-900">{requests.filter(r => r.Status === 'rejected').length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Requests</p>
                  <p className="text-2xl font-semibold text-gray-900">{requests.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Requests List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Join Requests</h2>
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                      <option value="all">All Requests</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {filteredRequests.map((request) => (
                    <div 
                      key={request.Request_ID} 
                      className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${selectedRequest?.Request_ID === request.Request_ID ? 'bg-blue-50' : ''}`}
                      onClick={() => setSelectedRequest(request)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <img
                            src={request.User_Photo || 'https://cdn-icons-png.flaticon.com/512/4537/4537019.png'}
                            alt={request.User_Name}
                            className="w-12 h-12 rounded-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(request.User_Name)}&background=3B82F6&color=fff`;
                            }}
                          />
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900">{request.User_Name}</h3>
                            <p className="text-sm text-gray-600">{request.User_Email}</p>
                          </div>
                        </div>

                        {/* <div className="flex flex-col items-end space-y-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusBadge(request.status)}`}>
                            {request.status}
                          </span>
                          <p className="text-xs text-gray-500">{formatDate(request.requestDate)}</p>
                        </div> */}
                      </div>
                    </div>
                  ))}
                </div>

                {filteredRequests.length === 0 && (
                  <div className="p-12 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No requests found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {filter === 'pending' ? 'No pending join requests at the moment.' : 'Try changing the filter to see other requests.'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Request Details */}
            <div className="lg:col-span-1">
              {selectedRequest ? (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={selectedRequest.User_Photo || 'https://cdn-icons-png.flaticon.com/512/4537/4537019.png'}
                        alt={selectedRequest.User_Name}
                        className="w-16 h-16 rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedRequest.User_Name)}&background=3B82F6&color=fff`;
                        }}
                      />
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{selectedRequest.User_Name}</h4>
                        <p className="text-sm text-gray-600">{selectedRequest.User_Email}</p>
                      </div>
                    </div>

                    {/* <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Request Date</h5>
                      <p className="text-sm text-gray-600">{formatDate(selectedRequest.requestDate)}</p>
                    </div> */}

                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Status</h5>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusBadge(selectedRequest.Status)}`}>
                        {selectedRequest.Status}
                      </span>
                    </div>

                    {selectedRequest.Status === 'pending' && (
                      <div className="flex space-x-3 pt-4">
                        <button
                          onClick={() => handleApprove(selectedRequest.Request_ID)}
                          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(selectedRequest.Request_ID)}
                          className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Select a Request</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Click on a request from the list to view details and take action.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
