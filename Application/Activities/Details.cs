using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Persistence;

namespace Application.Activities;

public class Details
{
	public class Query : IRequest<Result<Activity>>
	{
		public string? ID { get; set; }
	}
	public class Handler : IRequestHandler<Query, Result<Activity>>
	{
		private static IValidator<Query> _validator = new QueryDetailsValidator();
		private readonly DataContext _context;
		public Handler(DataContext context)
		{
			_context = context;
		}

		public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
		{
			var result = _validator.Validate(request);
			if (!result.IsValid)
			{
				var modelState = new ModelStateDictionary();
				result.AddErrorToModelState(modelState);
				return Result<Activity>.Failure(modelState);
			}
			Guid Id = Guid.Parse(request.ID!);
			return Result<Activity>.Success(await _context.Activities!.FindAsync(Id));
		}
	}
}