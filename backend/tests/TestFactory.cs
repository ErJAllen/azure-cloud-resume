using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.IO;
using System.Text;
using Microsoft.Azure.Functions.Worker.Http;
using System.Text.Json;
using System.Collections.Generic;

public static class TestFactory
{
    public static HttpRequestData CreateHttpRequest()
    {
        var context = new DefaultHttpContext();
        var request = context.Request;
        request.Body = new MemoryStream(Encoding.UTF8.GetBytes("{}")); // Empty JSON body
        return new TestHttpRequestData(new TestFunctionContext(), request);
    }

    public static ILogger CreateLogger()
    {
        return LoggerFactory.Create(builder => builder.AddConsole()).CreateLogger("TestLogger");
    }
}