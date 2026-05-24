import { requireTeacher } from '@/lib/auth-helpers'
import { pool } from '@/lib/db'

interface StatCard {
  label: string
  value: string | number
  icon: string
  color: string
}

function Stat({ label, value, icon, color }: StatCard) {
  return (
    <div style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: 8, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ width: 44, height: 44, borderRadius: 8, background: color + '22', color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 24, fontWeight: 700, color: '#1B1B1B' }}>{value}</div>
        <div style={{ fontSize: 13, color: '#6B7280' }}>{label}</div>
      </div>
    </div>
  )
}

export default async function TeacherPortalPage() {
  const session = await requireTeacher()

  // Fetch teacher's class info
  const classResult = await pool.query<{ id: string; name: string; class_code: string; student_count: string }>(
    `SELECT c.id, c.name, c.class_code,
            COUNT(ce.student_id) AS student_count
     FROM classes c
     LEFT JOIN class_enrollments ce ON ce.class_id = c.id
     WHERE c.teacher_id = $1
     GROUP BY c.id
     LIMIT 1`,
    [session.user.id]
  )
  const cls = classResult.rows[0]

  const studentCount = cls ? parseInt(cls.student_count) : 0

  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1B1B1B', margin: 0 }}>
            {cls?.name ?? 'My Class'}
          </h1>
          {cls?.class_code && (
            <span style={{ fontSize: 13, background: '#EAF0FD', color: '#1865F2', borderRadius: 6, padding: '4px 12px', fontWeight: 600, letterSpacing: '0.05em' }}>
              Code: {cls.class_code}
            </span>
          )}
        </div>
        <div style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>
          AIT General Course · {new Date().getFullYear()}
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
        <Stat label="Students" value={studentCount} icon="👥" color="#1865F2" />
        <Stat label="Avg. Progress" value="—" icon="📈" color="#0A7B57" />
        <Stat label="Assignments" value="—" icon="📋" color="#E07B00" />
        <Stat label="Ungraded" value="—" icon="⏳" color="#D92B2B" />
      </div>

      {/* Placeholder sections */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: 8, padding: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#1B1B1B', marginBottom: 16 }}>Topic Progress Overview</div>
          <div style={{ color: '#6B7280', fontSize: 13, textAlign: 'center', padding: '32px 0' }}>
            Progress data will appear here once students start completing lessons
          </div>
        </div>

        <div style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: 8, padding: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#1B1B1B', marginBottom: 16 }}>Recent Activity</div>
          <div style={{ color: '#6B7280', fontSize: 13, textAlign: 'center', padding: '32px 0' }}>
            Activity feed will appear here
          </div>
        </div>
      </div>
    </div>
  )
}
