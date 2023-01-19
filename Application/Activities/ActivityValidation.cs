using Domain;
using FluentValidation;
using FluentValidation.Results;
using MediatR;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Application.Activities;
public static class FluentValidationExtensions
{
	#region ModelState Extensions
	public static void AddErrorToModelState(this ValidationResult result, ModelStateDictionary modelState)
	{
		foreach (var error in result.Errors)
			modelState.AddModelError((string)error.FormattedMessagePlaceholderValues.First().Value, error.ErrorMessage);
	}
	#endregion

	#region IRuleBuilder Extensions 
	public static IRuleBuilderOptions<T, TProperty> ParsabilityCheck<T, TProperty>
	(
		this IRuleBuilder<T, TProperty> ruleBuilder,
		Func<TProperty, string, bool> checkFunc,
		string format
	)
		=> ruleBuilder.Must(tProperty => checkFunc(tProperty, format)).WithMessage("'{PropertyName}' is not valid.");

	public static IRuleBuilderOptions<T, TProperty> ParsabilityCheck<T, TProperty>
	(
		this IRuleBuilder<T, TProperty> ruleBuilder,
		Func<TProperty, bool> checkFunc
	)
		=> ruleBuilder.Must(tProperty => checkFunc(tProperty)).WithMessage("'{PropertyName}' is not valid.");
	#endregion
}

public class CheckFuncs
{
	internal static Func<string?, string, bool> IdIsParsableToGuid =
		(id, format) => Guid.TryParseExact(id, format, out Guid useless);

	internal static Func<string?, bool> DateIsParsableToDateTime =
		(date) => DateTime.TryParse(date, null, out DateTime useless);
}

public class ActivityValidator : AbstractValidator<Activity>
{
	public ActivityValidator()
	{
		RuleFor(a => a.Title).NotEmpty();
		RuleFor(a => a.Date).NotEmpty();
		RuleFor(a => a.Description).NotEmpty();
		RuleFor(a => a.Category).NotEmpty();
		RuleFor(a => a.City).NotEmpty();
		RuleFor(a => a.Venue).NotEmpty();
	}
}

public class RawActivityValidator : AbstractValidator<RawActivity>
{
	public RawActivityValidator()
	{
		RuleFor(a => a.ID).ParsabilityCheck(CheckFuncs.IdIsParsableToGuid, "D");
		RuleFor(a => a.Title).NotEmpty();
		RuleFor(a => a.Date).ParsabilityCheck(CheckFuncs.DateIsParsableToDateTime);
		RuleFor(a => a.Description).NotEmpty();
		RuleFor(a => a.Category).NotEmpty();
		RuleFor(a => a.City).NotEmpty();
		RuleFor(a => a.Venue).NotEmpty();
	}
}

public class CommandActivityValidator : AbstractValidator<IActivityContainer<RawActivity>>
{
	public CommandActivityValidator() => RuleFor(c => c.Activity).SetValidator(new RawActivityValidator()!);
}

public class CommandDeleteValidator : AbstractValidator<Delete.Command>
{
	public CommandDeleteValidator() => RuleFor(c => c.Id).ParsabilityCheck(CheckFuncs.IdIsParsableToGuid, "D");
}

public class QueryDetailsValidator : AbstractValidator<Details.Query>
{
	public QueryDetailsValidator() => RuleFor(q => q.ID).ParsabilityCheck(CheckFuncs.IdIsParsableToGuid, "D");
}
