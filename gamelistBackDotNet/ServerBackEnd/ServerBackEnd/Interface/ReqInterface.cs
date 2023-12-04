namespace ServerBackEnd.Interface
{
    public interface IHttpRequestMessageFactory
    {
        HttpRequestMessage CreateHttpRequestMessage(HttpMethod method/*,string ReqUri*/);
    }

    public class HttpRequestMessageFactory : IHttpRequestMessageFactory
    {
        public HttpRequestMessage CreateHttpRequestMessage(HttpMethod method/*, string ReqUri*/)
        {
            var req = new HttpRequestMessage(method, "https://api.twitch.tv/helix/games");
            req.Headers.Add("Authorization", "Bearer bwyf8efb484b12penpbpdu57lg0umm");
            req.Headers.Add("Client-ID", "x7jn4h2zd6wv0xtaegj3zg6oohxt3f");
            req.Headers.Add("Cookie", "twitch.lohp.countryCode=FR; unique_id=vzI6cr0uM8Pfvh4ymsydAFb12htfF9b3; unique_id_durable=vzI6cr0uM8Pfvh4ymsydAFb12htfF9b3");
            return req;
        }
    }
}
