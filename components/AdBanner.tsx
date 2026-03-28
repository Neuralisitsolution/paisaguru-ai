'use client';

interface AdBannerProps {
  slot?: string;
  format?: 'leaderboard' | 'rectangle' | 'in-article' | 'sidebar';
  className?: string;
}

export default function AdBanner({ slot, format = 'leaderboard', className = '' }: AdBannerProps) {
  const styles: Record<string, { wrapper: string; label: string }> = {
    leaderboard: {
      wrapper: 'w-full min-h-[90px] max-w-[728px] mx-auto',
      label: 'Leaderboard Ad (728x90)',
    },
    rectangle: {
      wrapper: 'w-full min-h-[250px] max-w-[300px]',
      label: 'Rectangle Ad (300x250)',
    },
    'in-article': {
      wrapper: 'w-full min-h-[250px] max-w-full my-6',
      label: 'In-Article Ad',
    },
    sidebar: {
      wrapper: 'w-full min-h-[600px] max-w-[300px]',
      label: 'Sidebar Ad (300x600)',
    },
  };

  const style = styles[format] || styles.leaderboard;

  return (
    <div className={`${style.wrapper} ${className}`}>
      {/* AdSense placeholder — replace with real code after approval */}
      <div className="w-full h-full bg-gray-50 border border-dashed border-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-[10px] text-gray-300 font-medium">{style.label}</p>
      </div>
      {/*
        After Google AdSense approval, replace the placeholder above with:
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot || 'XXXXXXXXXX'}
          data-ad-format="auto"
          data-full-width-responsive="true" />
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      */}
    </div>
  );
}
