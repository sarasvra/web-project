type AuthLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function AuthLayout({
  title,
  children,
}: AuthLayoutProps) {
  return (
    <main className="h-screen box-border overflow-hidden bg-[#F3F7FC] p-3 sm:p-5 md:p-8 lg:px-20 lg:py-10 xl:px-35 xl:py-5">
      <div className="flex h-full w-full overflow-hidden rounded-3xl bg-white shadow-[0_0_45px_rgba(37,99,235,0.3)]">

        <div className="flex w-full items-center justify-center p-6 md:w-1/2 md:p-10 -translate-y-5">
          <div className="w-full max-w-md">

           
            <div className="mb-3 mt-10 flex justify-center">
              <img
                src="/images/logo.png"
                alt="Nell logo"
                className="h-12 w-auto object-contain"
              />
            </div>

            
            <div className="mb-4 text-center">
              <h1 className="font-bold text-2xl text-blue-900">
                {title}
              </h1>
            </div>

            {children}

          </div>
        </div>

              <div className="hidden h-full w-1/2 flex-col items-center justify-end overflow-hidden rounded-r-[10%] bg-gradient-to-br from-[#00FFFF] via-white to-[#0000FF] pb-10 text-center md:flex">

                  <img
                       src="/images/login.jpg"
                       alt="login picture"
                       className="min-h-0 w-full flex-1 rounded-2xl object-cover -translate-y-10" />

                   <h2 className="text-3xl font-bold text-[#0000FF] -translate-x-5">
                        Nell clayArt
                   </h2>

                   <p className="mt-3 max-w-sm text-base font-bold leading-7 text-[#0059FF] -translate-x-5">
                             اکسسوری‌های فانتزی و ظریف برای حس خوب
                   </p>

              </div>
          </div>
      </main>
  );
}