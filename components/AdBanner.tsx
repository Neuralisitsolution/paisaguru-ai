interface AdBannerProps {
  slot?: string;
  format?: 'horizontal' | 'vertical' | 'rectangle';
}

export default function AdBanner({ format = 'horizontal' }: AdBannerProps) {
  const sizes = {
    horizontal: 'h-24 w-full',
    vertical: 'h-[600px] w-full max-w-[300px]',
    rectangle: 'h-[250px] w-full max-w-[300px]',
  };

  return (
    <div className={`${sizes[format]} bg-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-center`}>
      <p className="text-xs text-gray-400 font-medium">Advertisement</p>
      {/* Google AdSense code will go here after approval:
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXX"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true" />
      */}
    </div>
  );
}
