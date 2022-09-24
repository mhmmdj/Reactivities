using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class DataContext : DbContext
{
	public DataContext(DbContextOptions options) : base(options)
	{
		
	}

	// Database table
	public DbSet<Activity> Activities { get; set; }
}
