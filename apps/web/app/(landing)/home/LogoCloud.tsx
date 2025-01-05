import Image from "next/image";

export function LogoCloud() {
  return (
    <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
      <h2 className="text-center font-cal text-lg leading-8 text-gray-900">
        Backed By
      </h2>

      <div className="mx-auto mt-8 grid max-w-lg grid-cols-1 items-center justify-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-1 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-1">
        <Image
          className="max-h-12 w-full object-contain"
          src="/images/logos/aws.png"
          alt="AWS"
          width={158}
          height={48}
        />
      </div>
    </div>
  );
}
