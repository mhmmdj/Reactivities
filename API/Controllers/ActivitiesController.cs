using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
	[HttpGet]
	public async Task<IActionResult> GetActivities()
		=> HandleResult<List<Activity>>(await Mediator!.Send(new List.Query()));

	[HttpGet("{id}")]  //activities/id
	public async Task<IActionResult> GetActivity(string id)
		=> HandleResult<Activity>(await Mediator!.Send(new Details.Query() { ID = id }));

	[HttpPost]
	public async Task<IActionResult> CreateActivity([FromBody] RawActivity activity)
		=> HandleResult(await Mediator!.Send(new Create.Command { Activity = activity }));

	[HttpPut("{id}")]
	public async Task<IActionResult> EditActivity(string id, [FromBody] RawActivity activity)
	{
		activity.ID = id;
		return HandleResult(await Mediator!.Send(new Edit.Command() { Activity = activity }));
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> DeleteActivity(string id)
		=> HandleResult(await Mediator!.Send(new Delete.Command() { Id = id }));
}