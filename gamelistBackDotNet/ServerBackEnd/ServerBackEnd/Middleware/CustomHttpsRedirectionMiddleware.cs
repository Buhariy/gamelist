namespace ServerBackEnd.Middleware
{
    public class CustomHttpsRedirectionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly string _redirectPath;

        public CustomHttpsRedirectionMiddleware(RequestDelegate next, string redirectPath)
        {
            _next = next;
            _redirectPath = redirectPath;
        }

        public async Task Invoke(HttpContext context)
        {
            if(!context.Request.IsHttps)
            {
                var httpsurl = $"https://{context.Request.Host}{_redirectPath}";
                context.Response.Redirect(httpsurl);
                return;
            }
            await _next(context);
        }
    }
}
