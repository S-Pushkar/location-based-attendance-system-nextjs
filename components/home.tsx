export default function HomeComponent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-slate-800 rounded-lg p-6 md:p-8 shadow-[0px_0px_20px_4px_gray]">
        <h1 className="text-3xl font-bold text-center mb-6">
          Attendance System
        </h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-400 leading-relaxed">
            Our attendance system streamlines the process of tracking employee
            or student attendance by verifying their physical presence in a
            specified location. With this system, organizations can ensure
            attendance accuracy without manual entry or paper records, enhancing
            accountability and operational efficiency.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
          <p className="text-gray-400">
            To start using the attendance system, please log in with your
            credentials. Let's make attendance tracking easy, transparent, and
            secure!
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>
              <strong>Real-Time Location Verification:</strong> Uses geolocation
              data to confirm the user's presence at the required location
              before logging attendance.
            </li>
            <li>
              <strong>Secure and Accurate Logging:</strong> Eliminates manual
              errors and prevents fraudulent attendance logging with GPS-based
              verification.
            </li>
            <li>
              <strong>Cross-Platform Support:</strong> Accessible on mobile and
              desktop devices, with seamless integration across different
              operating systems.
            </li>
            <li>
              <strong>Database Management:</strong> Stores attendance records in
              a secure database, allowing easy retrieval and analysis.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-400">
            <li>
              <strong>User Check-In:</strong> Users check in from their mobile
              or desktop devices.
            </li>
            <li>
              <strong>Location Verification:</strong> The system captures the
              user's current location through GPS and verifies it against the
              authorized location.
            </li>
            <li>
              <strong>Attendance Record Creation:</strong> Upon successful
              verification, an attendance entry is recorded in the system.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>
              <strong>Increased Accuracy:</strong> Prevents “proxy attendance”
              by ensuring users are at the required location when checking in.
            </li>
            <li>
              <strong>Automated and Efficient:</strong> Reduces the need for
              manual attendance, saving time for both users and administrators.
            </li>
            <li>
              <strong>Data-Driven Insights:</strong> Enables organizations to
              analyze attendance patterns and improve resource management.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
