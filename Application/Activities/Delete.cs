using Application.Core;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Persistence;

namespace Application.Activities;

public class Delete
{
	public class Command : IRequest<Result<Unit>>
	{
		public string? Id { get; set; }
	}

	public class Handler : IRequestHandler<Command, Result<Unit>>
	{
		private IValidator<Command> _validator = new CommandDeleteValidator();

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
				var stateModel = new ModelStateDictionary();
				result.AddErrorToModelState(stateModel);
				return Result<Unit>.Failure(stateModel);
			}
			Guid Id = Guid.Parse(request.Id!);
			var activity = await _context.Activities!.FindAsync(Id);
			if (activity == null) return null!;
			_context.Remove(activity);
			var changed = await _context.SaveChangesAsync() > 0;
			if (!changed) return Result<Unit>.Failure("Delete Error", "Failed to delete Activity.", Responses.Server);
			return Result<Unit>.Success(Unit.Value);
		}
	}
}