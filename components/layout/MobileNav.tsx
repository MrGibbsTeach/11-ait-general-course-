'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { UnitRow } from '@/types/database'

interface MobileNavProps {
  units: UnitRow[]
}

export default function MobileNav({ units }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Hamburger button — shown on < 1024px */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8, fontSize: 20 }}
        className="mobile-menu-btn"
      >
        ☰
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 40 }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, width: 280,
        background: 'white', zIndex: 50, display: 'flex', flexDirection: 'column',
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.25s ease',
        boxShadow: open ? '4px 0 24px rgba(0,0,0,0.15)' : 'none',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #E0E0E0' }}>
          <span style={{ color: '#1865F2', fontWeight: 700, fontSize: 15 }}>AIT General Course</span>
          <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#6B7280' }} aria-label="Close menu">✕</button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
          <Link href="/dashboard" onClick={() => setOpen(false)} style={{ display: 'block', padding: '10px 16px', fontSize: 14, color: '#1B1B1B', textDecoration: 'none', fontWeight: 500 }}>
            ⊞ Overview
          </Link>

          <div style={{ padding: '8px 16px 4px', fontSize: 10, fontWeight: 600, color: '#6B7280', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Units</div>

          {units.map((unit, i) => {
            const locked = unit.status !== 'available'
            return (
              <div key={unit.id} style={{ opacity: locked ? 0.5 : 1 }}>
                {locked ? (
                  <div style={{ padding: '10px 16px', fontSize: 13, color: '#9CA3AF' }}>
                    🔒 Unit {i + 1} — {unit.title}
                  </div>
                ) : (
                  <Link href={`/course/unit/${unit.id}`} onClick={() => setOpen(false)} style={{ display: 'block', padding: '10px 16px', fontSize: 13, color: '#1B1B1B', textDecoration: 'none' }}>
                    Unit {i + 1} — {unit.title}
                  </Link>
                )}
              </div>
            )
          })}
        </nav>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
