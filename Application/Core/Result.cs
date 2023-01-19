using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Application.Core;

public class Result<T>
{
	public bool isSuccess { get; set; }
	public T? Value { get; set; }
	public ModelStateDictionary? modelState { get; set; }

	public static Result<T> Success(T? value) => new Result<T> { isSuccess = true, Value = value };
	public static Result<T> Failure(ModelStateDictionary modelState) => new Result<T> { isSuccess = false, modelState = modelState };
	public static Result<T> Failure(string key, string message, Responses kind)
	{
		var modelState = new ModelStateDictionary();
		modelState.AddModelError(key, message);
		if (kind is Responses.Server) modelState.AddModelError("500", "");
		return new Result<T> { isSuccess = false, modelState = modelState };
	}
}