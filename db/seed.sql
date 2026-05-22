-- AIT General Year 11 Course Platform
-- Seed Data

-- ============================================================
-- UNITS
-- ============================================================

INSERT INTO units (title, subtitle, semester, order_index, status, color, icon)
VALUES
  (
    'Personal Communication',
    'Using technology to meet personal needs',
    1,
    1,
    'coming_soon',
    '#9059FF',
    'user'
  ),
  (
    'Working with Others',
    'Managing data, networks and digital solutions',
    2,
    2,
    'available',
    '#1865F2',
    'users'
  );

-- ============================================================
-- UNIT 2 TOPICS
-- ============================================================

INSERT INTO topics (unit_id, title, order_index, color, icon, estimated_hours)
SELECT
  u.id,
  t.title,
  t.order_index,
  t.color,
  t.icon,
  t.estimated_hours
FROM units u
CROSS JOIN (
  VALUES
    ('Managing Data',          1, '#1865F2', 'database',   10),
    ('Networks',               2, '#0A7B57', 'wifi',        8),
    ('Impacts of Technology',  3, '#E07B00', 'shield',      7),
    ('Application Skills',     4, '#D92B2B', 'monitor',    20),
    ('Project Management',     5, '#9059FF', 'clipboard',  10)
) AS t(title, order_index, color, icon, estimated_hours)
WHERE u.title = 'Working with Others';
