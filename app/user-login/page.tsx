export default function UserLogin() {
    return (
      <div className="w-full flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-slate-800 rounded-lg shadow-lg p-6 space-y-4">
          <h1 className="text-2xl sm:text-3xl text-white font-bold text-center">
            User Login
          </h1>
  
          <div className="space-y-3">
            <input
              className="w-3/4 mx-auto block px-3 py-1.5 rounded-lg text-black text-sm
                       bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              type="email"
              autoFocus
            />
  
            <input
              className="w-3/4 mx-auto block px-3 py-1.5 rounded-lg text-black text-sm
                       bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              type="password"
            />
  
            <button
              className="w-1/2 mx-auto block py-1.5 px-3 bg-blue-600 hover:bg-blue-700 
                       text-white rounded-lg text-sm
                       transition-colors duration-200 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }
  