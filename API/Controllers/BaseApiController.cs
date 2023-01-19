using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace API.Controllers;

[ApiController]
[Route("api/[Controller]")]
public class BaseApiController : ControllerBase
{
	private IMediator? _mediator;
	protected IMediator? Mediator => _mediator ??= HttpContext.RequestServices
		.GetService<IMediator>();

	protected ActionResult HandleResult<T>(Result<T>? result)
	{
		if (result is null) return NotFound();
		if (result.isSuccess && result.Value != null) return Ok(result.Value);
		if (result.isSuccess && result.Value == null) throw new KeyNotFoundException("ID not found");
		#region Server Errors
		if (!result.isSuccess && result.modelState!.FindKeysWithPrefix("500").Any())
		{
			result.modelState.Remove("500");
			return Problem(
				title: result.modelState!.First().Key,
				detail: result.modelState.First().Value!.Errors[0].ErrorMessage,
				statusCode: 500
				);
		}
		#endregion
		if (!result.isSuccess) return BadRequest(result.modelState!);
		return Problem(statusCode: 500, title: "Server Unknown Error");
	}
}