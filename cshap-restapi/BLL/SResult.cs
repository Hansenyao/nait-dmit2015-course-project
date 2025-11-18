using cshap_restapi.BLL.Interfaces;

namespace cshap_restapi.BLL.Interfaces
{
    public class SResult<T>
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public T? Data { get; set; }

        public static SResult<T> Ok(T data) =>
            new SResult<T> { Success = true, Data = data };

        public static SResult<T> Fail(string message) =>
            new SResult<T> { Success = false, Message = message };
    }
}
public class SResult : SResult<object?>
{
    public static SResult Ok() =>
        new SResult { Success = true };

    public static new SResult Fail(string message) =>
        new SResult { Success = false, Message = message };
}