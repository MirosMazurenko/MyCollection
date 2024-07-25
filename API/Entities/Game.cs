using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsvHelper.Configuration.Attributes;

namespace API.Entities;

public class Game
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string ConsoleName { get; set; }
    public double LoosePrice { get; set; }
    public double CompletePrice { get; set; }
    public double NewPrice { get; set; }
    public DateTime Date { get; set; }
}
