namespace Domain;

public class RawActivity
{
	public string? ID { get; set; }
	public string? Title { get; set; }
	public string? Date { get; set; }
	public string? Description { get; set; }
	public string? Category { get; set; }
	public string? City { get; set; }
	public string? Venue { get; set; }

	public Activity ConvertToActivity()
			=> new Activity()
			{
				ID = Guid.Parse(ID!),
				Title = Title,
				Date = DateTime.Parse(Date!),
				Description = Description,
				Category = Category,
				City = City,
				Venue = Venue
			};

}