        {/* Recent Claims Table */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-10 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold">Recent Claims Activity</h3>
            <button 
              onClick={() => {
                const csvContent = "data:text/csv;charset=utf-8," 
                  + "Claim ID,Date,Provider,Billed Amount,Savings\n"
                  + "CL-7842,May 5,St. Louis Orthopedics,$2,847,$612\n"
                  + "CL-7841,May 4,Midwest Imaging,$1,394,$298\n"
                  + "CL-7840,May 3,SSM Health,$3,210,$874\n"
                  + "CL-7839,May 2,Barnes-Jewish,$892,$203";
                
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "quantum_selfflow_claims_report.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl text-sm transition flex items-center gap-2"
            >
              📥 Download Full Report (CSV)
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 text-left text-sm text-slate-400">
                  <th className="pb-4">Claim ID</th>
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Provider</th>
                  <th className="pb-4 text-right">Billed</th>
                  <th className="pb-4 text-right">Savings</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {fakeClaims.map((claim) => (
                  <tr key={claim.id} className="border-b border-white/10 last:border-0">
                    <td className="py-5 font-mono">{claim.id}</td>
                    <td className="py-5 text-slate-400">{claim.date}</td>
                    <td className="py-5">{claim.provider}</td>
                    <td className="py-5 text-right">{claim.amount}</td>
                    <td className="py-5 text-right text-emerald-400 font-medium">{claim.savings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>