namespace Application.Activities;

public interface IActivityContainer<T>
{
	T? Activity { get; set; }
}