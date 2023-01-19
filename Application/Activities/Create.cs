using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Persistence;

namespace Application.Activities;

public class Create
{
	public class Command : IRequest<Result<Unit>>, IActivityContainer<RawActivity>
	{
		public RawActivity? Activity { get; set; }
	}

	public class Handler : IRequestHandler<Command, Result<Unit>>
	{
		private static IValidator<Command> _validator = new CommandActivityValidator();

		private readonly DataContext _context;
		public Handler(DataContext context)
		{
			_context = context;
		}

		public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
		{
			var result = _validator.Validate(request);
			if (!result.IsValid)
			{
				var modelState = new ModelStateDictionary();
				result.AddErrorToModelState(modelState);
				return Result<Unit>.Failure(modelState);
			}
			var activity = request.Activity!.ConvertToActivity();
			_context.Activities!.Add(activity);
			var changed = await _context.SaveChangesAsync() > 0;
			if (!changed) return Result<Unit>.Failure("Create Error", "Failed to create new Activity.", Responses.Server);
			return Result<Unit>.Success(Unit.Value);
		}
	}
}