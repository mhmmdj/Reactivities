using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Persistence;

namespace Application.Activities;

public class Edit
{

	public class Command : IRequest<Result<Unit>>, IActivityContainer<RawActivity>
	{
		public RawActivity? Activity { get; set; }
	}

	public class Handler : IRequestHandler<Command, Result<Unit>>
	{
		private static IValidator<Command> _validator = new CommandActivityValidator();
		private readonly DataContext _context;
		private readonly IMapper _mapper;
		public Handler(DataContext context, IMapper mapper)
		{
			_mapper = mapper;
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
			var updatedActivity = request.Activity!.ConvertToActivity();
			Activity? activity = await _context.Activities!.FindAsync(updatedActivity.ID);
			if (activity is null) return null!;
			_mapper.Map(updatedActivity, activity);
			bool changed = await _context.SaveChangesAsync() > 0;
			if (!changed) return Result<Unit>.Failure("Edit Error", "Failed to edit the Activity.", Responses.Server);
			return Result<Unit>.Success(Unit.Value);
		}
	}
}