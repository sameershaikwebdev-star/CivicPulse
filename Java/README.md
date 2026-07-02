# CivicPulse — Issue Reporting System (Java)

An intermediate-level, menu-driven Java console application for reporting and tracking civic issues (potholes, water supply problems, broken streetlights, sanitation complaints, etc.).

## Concepts Demonstrated

- **OOP**: encapsulation, constructors, `toString()` overriding
- **Enums**: `IssueCategory`, `IssueStatus`
- **Custom checked exception**: `IssueNotFoundException`
- **Collections & Streams**: `ArrayList`, `Comparator`, `Collectors.groupingBy`
- **File I/O**: persists issues to `civic_issues.txt` so data survives between runs
- **Switch expressions** (Java 14+ syntax)
- **Input validation** with a re-prompt loop

## File Structure

```
Java/
└── civicpulse/
    ├── Issue.java                 # Core domain model
    ├── IssueCategory.java         # Enum: ROAD_DAMAGE, WATER_SUPPLY, etc.
    ├── IssueStatus.java           # Enum: PENDING, IN_PROGRESS, RESOLVED, REJECTED
    ├── IssueNotFoundException.java# Custom checked exception
    ├── IssueManager.java          # Business logic + file persistence
    └── CivicPulseApp.java         # main() — menu-driven console UI
```

## How to Compile & Run

Requires **JDK 17+** (uses switch expressions).

```bash
cd Java
javac civicpulse/*.java
java -cp . civicpulse.CivicPulseApp
```

On first run it creates `civic_issues.txt` in the working directory to store reported issues. Delete that file any time to reset the data.

## Features

1. **Report New Issue** — title, description, category, location, reporter name, priority (1–5)
2. **View All Issues** — lists every issue with a formatted summary line
3. **Update Issue Status** — move an issue through PENDING → IN_PROGRESS → RESOLVED/REJECTED
4. **Filter Issues** — by status or by category
5. **Summary Report** — counts grouped by status and by category
6. **View Issues by Priority** — sorted highest priority first

## Sample Run

```
--- Report New Issue ---
Title: Pothole on Main St
Description: Large pothole causing traffic issues
Select Category:
1. ROAD_DAMAGE
...
Choice: 1
Location: Main Street near Bus Stop
Your Name: Sameer
Priority (1-Low to 5-High): 5
Issue reported successfully! Assigned ID: 1001
```

## Possible Extensions (for further practice)

- Add a `Comment` class so citizens can add follow-up notes to an issue
- Add authentication so only an "admin" role can update status
- Swap the flat-file storage for JDBC + the MySQL `CompanyDB`/`CivicPulse` database in the `Database` folder
- Add unit tests with JUnit for `IssueManager`
