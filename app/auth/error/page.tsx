export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

  return (
    <div className="min-h-svh w-full flex flex-col items-center justify-center p-4 md:p-10 bg-background relative overflow-hidden">
      {/* Gradient orbs background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-sm relative z-10 animate-in">
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <div className="flex justify-center mb-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">⚡</span>
            </div>
          </div>

          <div className="glass-lg p-8 rounded-2xl border backdrop-blur-xl">
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-destructive to-red-600 bg-clip-text text-transparent mb-2">
                Sorry!
              </h1>
              <p className="text-muted-foreground text-sm mb-6">
                Something went wrong
              </p>
              
              <div className="glass-sm bg-destructive/20 border border-destructive/50 p-4 rounded-lg">
                {params?.error ? (
                  <p className="text-sm text-foreground">
                    Error: {params.error}
                  </p>
                ) : (
                  <p className="text-sm text-foreground">
                    An unspecified error occurred. Please try again later.
                  </p>
                )}
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Smart Campus AI • Your campus, smarter
          </p>
        </div>
      </div>
    </div>
  )
}
