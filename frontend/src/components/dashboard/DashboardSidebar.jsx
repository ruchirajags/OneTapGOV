'use client';
import { usePathname, useRouter } from 'next/navigation';
import Image from "next/image";

const NAV = [
    {
        label: 'Dashboard',
        icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
        href: '/dashboard',
    },
    {
        label: 'My Profile',
        icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
        href: '/profile',
        section: 'Account',
    },
];

export default function DashboardSidebar({ profile }) {
    const router = useRouter();
    const pathname = usePathname();

    const initials = profile?.full_name
        ? profile.full_name
            .split(' ')
            .map((w) => w[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()
        : 'U';

    const sectorLabel = profile?.sector
        ? profile.sector.charAt(0).toUpperCase() + profile.sector.slice(1)
        : 'Citizen';

    return (
        <aside
            style={{
                width: 224,
                background: '#0F150A',
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0,
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 50,
            }}
        >
        {/* Logo */}
        <div
            style={{
                padding: '18px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Image
                src="/OneTapGOV-FinalLogo.png"
                alt="OneTapGOV"
                width={160}
                height={46}
                priority
            />

            <div
                style={{
                    fontSize: 10,
                    color: 'rgba(255,255,255,0.3)',
                    marginTop: 6,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                }}
            >
            </div>
        </div>

            {/* Nav */}
            <nav style={{ padding: '12px 10px', flex: 1, overflowY: 'auto' }}>
                {NAV.map((item, i) => {
                    const showSection =
                        item.section &&
                        (i === 0 || NAV[i - 1]?.section !== item.section);

                    const active =
                        (pathname === '/dashboard' && item.label === 'Dashboard') ||
                        (pathname === '/dashboard' && item.label === 'AI Assistant') ||
                        (pathname === '/dashboard' &&
                            item.label === 'Recommended Schemes') ||
                        (pathname === '/profile' && item.label === 'My Profile');

                    const isCurrentPage =
                        (pathname === '/dashboard' && item.href === '/dashboard') ||
                        (pathname === '/profile' && item.href === '/profile');

                    return (
                        <div key={item.label}>
                            {showSection && (
                                <div
                                    style={{
                                        fontSize: 10,
                                        color: 'rgba(255,255,255,0.25)',
                                        letterSpacing: '0.08em',
                                        textTransform: 'uppercase',
                                        padding: '10px 10px 4px',
                                        marginTop: 4,
                                    }}
                                >
                                    {item.section}
                                </div>
                            )}
                            <div
                                onClick={() => router.push(item.href)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    padding: '9px 10px',
                                    borderRadius: 8,
                                    cursor: 'pointer',
                                    marginBottom: 2,
                                    color:
                                        pathname === item.href
                                            ? '#fff'
                                            : 'rgba(255,255,255,0.5)',
                                    fontSize: 13,
                                    fontWeight: 500,
                                    background:
                                        pathname === item.href && item.href !== '/dashboard'
                                            ? 'rgba(37,99,235,0.22)'
                                            : pathname === '/dashboard' &&
                                                item.href === '/dashboard' &&
                                                item.label === 'Dashboard'
                                                ? 'rgba(37,99,235,0.22)'
                                                : 'transparent',
                                    borderLeft:
                                        (pathname === '/dashboard' &&
                                            item.label === 'Dashboard') ||
                                            (pathname === '/profile' && item.label === 'My Profile')
                                            ? '2px solid #2563EB'
                                            : '2px solid transparent',
                                    transition: 'all 150ms ease',
                                }}
                                onMouseEnter={(e) => {
                                    const isDash =
                                        pathname === '/dashboard' && item.label === 'Dashboard';
                                    const isProf =
                                        pathname === '/profile' && item.label === 'My Profile';
                                    if (!isDash && !isProf) {
                                        e.currentTarget.style.background =
                                            'rgba(255,255,255,0.06)';
                                        e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    const isDash =
                                        pathname === '/dashboard' && item.label === 'Dashboard';
                                    const isProf =
                                        pathname === '/profile' && item.label === 'My Profile';
                                    if (!isDash && !isProf) {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                                    }
                                }}
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    viewBox="0 0 24 24"
                                    style={{ flexShrink: 0 }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d={item.icon}
                                    />
                                </svg>
                                {item.label}
                            </div>
                        </div>
                    );
                })}
            </nav>

            {/* User footer */}
            <div
                style={{
                    padding: '14px',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                }}
            >
                <div
                    style={{
                        width: 34,
                        height: 34,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #2563EB, #1488A6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        fontWeight: 700,
                        color: '#fff',
                        flexShrink: 0,
                    }}
                >
                    {initials}
                </div>
                <div style={{ minWidth: 0 }}>
                    <div
                        style={{
                            fontSize: 12.5,
                            fontWeight: 600,
                            color: '#fff',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {profile?.full_name || 'User'}
                    </div>
                    <div
                        style={{
                            fontSize: 10.5,
                            color: 'rgba(255,255,255,0.35)',
                            marginTop: 1,
                        }}
                    >
                        {sectorLabel}
                    </div>
                </div>
            </div>
        </aside>
    );
}