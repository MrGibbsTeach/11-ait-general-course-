export default function StudentsPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1B1B1B', margin: '0 0 4px' }}>Students</h1>
        <div style={{ fontSize: 13, color: '#6B7280' }}>Student enrolment and management</div>
      </div>

      <div style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: 10, padding: 40, textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>👥</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#1B1B1B', marginBottom: 8 }}>Student enrolment coming soon</div>
        <div style={{ fontSize: 13, color: '#6B7280', maxWidth: 380, margin: '0 auto' }}>
          Once student accounts are set up, you'll be able to manage enrolments, view individual profiles, and track each student's progress here.
        </div>
      </div>
    </div>
  )
}
