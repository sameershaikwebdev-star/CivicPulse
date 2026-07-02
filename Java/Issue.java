package civicpulse;

import java.time.LocalDate;

/**
 * Represents a single civic issue reported by a citizen
 * (e.g. a pothole, a broken streetlight, a water supply problem).
 */
public class Issue {

    // Shared counter used to auto-generate unique IDs for new issues.
    private static int counter = 1000;

    private final int id;
    private String title;
    private String description;
    private IssueCategory category;
    private String location;
    private String reporterName;
    private IssueStatus status;
    private final LocalDate dateReported;
    private int priority; // 1 (low) to 5 (high)

    /**
     * Constructor used when a citizen reports a brand-new issue.
     */
    public Issue(String title, String description, IssueCategory category,
                 String location, String reporterName, int priority) {
        this.id = ++counter;
        this.title = title;
        this.description = description;
        this.category = category;
        this.location = location;
        this.reporterName = reporterName;
        this.status = IssueStatus.PENDING;
        this.dateReported = LocalDate.now();
        this.priority = clampPriority(priority);
    }

    /**
     * Constructor used when reconstructing an issue from saved data on disk
     * (preserves the original ID, status, and reported date).
     */
    public Issue(int id, String title, String description, IssueCategory category,
                 String location, String reporterName, IssueStatus status,
                 LocalDate dateReported, int priority) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.location = location;
        this.reporterName = reporterName;
        this.status = status;
        this.dateReported = dateReported;
        this.priority = clampPriority(priority);

        // Keep the shared counter ahead of any ID loaded from file.
        if (id > counter) {
            counter = id;
        }
    }

    private int clampPriority(int p) {
        if (p < 1 || p > 5) {
            return 3; // default to medium priority if out of range
        }
        return p;
    }

    // ---------- Getters ----------

    public int getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public IssueCategory getCategory() { return category; }
    public String getLocation() { return location; }
    public String getReporterName() { return reporterName; }
    public IssueStatus getStatus() { return status; }
    public LocalDate getDateReported() { return dateReported; }
    public int getPriority() { return priority; }

    // ---------- Mutators ----------

    public void setStatus(IssueStatus status) {
        this.status = status;
    }

    public void setPriority(int priority) {
        this.priority = clampPriority(priority);
    }

    @Override
    public String toString() {
        return String.format(
            "ID: %-6d | %-22s | %-14s | %-11s | Priority: %d | Location: %-15s | Reported: %s | By: %s",
            id, title, category, status, priority, location, dateReported, reporterName
        );
    }

    /**
     * Serializes this issue to a single pipe-delimited line for file storage.
     */
    public String toCsvLine() {
        return id + "|" + title + "|" + description + "|" + category + "|" +
               location + "|" + reporterName + "|" + status + "|" + dateReported + "|" + priority;
    }

    /**
     * Reconstructs an Issue from a pipe-delimited line previously produced by toCsvLine().
     */
    public static Issue fromCsvLine(String line) {
        String[] parts = line.split("\\|", -1);
        int id = Integer.parseInt(parts[0]);
        String title = parts[1];
        String description = parts[2];
        IssueCategory category = IssueCategory.valueOf(parts[3]);
        String location = parts[4];
        String reporterName = parts[5];
        IssueStatus status = IssueStatus.valueOf(parts[6]);
        LocalDate dateReported = LocalDate.parse(parts[7]);
        int priority = Integer.parseInt(parts[8]);
        return new Issue(id, title, description, category, location, reporterName, status, dateReported, priority);
    }
}
