import Link from 'next/link';

interface AuthorBoxProps {
  name: string;
  title: string;
  bio: string;
  image?: string;
  slug: string;
  expertise?: string[];
}

export default function AuthorBox({ name, title, bio, slug, expertise }: AuthorBoxProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-heading font-bold text-xl flex-shrink-0">
          {name?.split(' ').map(n => n[0]).join('') || 'PG'}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-heading font-bold text-gray-900">{name}</h4>
            <span className="badge-expert text-[10px]">Verified Expert</span>
          </div>
          <p className="text-sm text-primary-600 font-medium mb-2">{title}</p>
          <p className="text-sm text-gray-600 mb-3">{bio}</p>
          {expertise && expertise.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {expertise.map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full">{tag}</span>
              ))}
            </div>
          )}
          <Link href={`/about#${slug}`} className="text-sm text-primary-600 hover:underline font-medium">
            View Profile &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}