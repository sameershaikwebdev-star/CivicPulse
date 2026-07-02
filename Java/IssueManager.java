package civicpulse;

import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Manages the collection of civic issues: adding, updating, filtering,
 * sorting, and persisting them to a simple text file.
 */
public class IssueManager {

    private final List<Issue> issues = new ArrayList<>();
    private final String filePath;

    public IssueManager(String filePath) {
        this.filePath = filePath;
        loadFromFile();
    }

    public Issue addIssue(String title, String description, IssueCategory category,
                           String location, String reporterName, int priority) {
        Issue issue = new Issue(title, description, category, location, reporterName, priority);
        issues.add(issue);
        saveToFile();
        return issue;
    }

    public Issue findById(int id) throws IssueNotFoundException {
        return issues.stream()
                .filter(i -> i.getId() == id)
                .findFirst()
                .orElseThrow(() -> new IssueNotFoundException("No issue found with ID " + id));
    }

    public void updateStatus(int id, IssueStatus newStatus) throws IssueNotFoundException {
        Issue issue = findById(id);
        issue.setStatus(newStatus);
        saveToFile();
    }

    public List<Issue> getAllIssues() {
        return Collections.unmodifiableList(issues);
    }

    public List<Issue> filterByStatus(IssueStatus status) {
        return issues.stream()
                .filter(i -> i.getStatus() == status)
                .collect(Collectors.toList());
    }

    public List<Issue> filterByCategory(IssueCategory category) {
        return issues.stream()
                .filter(i -> i.getCategory() == category)
                .collect(Collectors.toList());
    }

    public List<Issue> sortByPriorityDesc() {
        List<Issue> sorted = new ArrayList<>(issues);
        sorted.sort(Comparator.comparingInt(Issue::getPriority).reversed());
        return sorted;
    }

    public Map<IssueStatus, Long> getStatusSummary() {
        return issues.stream()
                .collect(Collectors.groupingBy(Issue::getStatus, Collectors.counting()));
    }

    public Map<IssueCategory, Long> getCategorySummary() {
        return issues.stream()
                .collect(Collectors.groupingBy(Issue::getCategory, Collectors.counting()));
    }

    private void saveToFile() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath))) {
            for (Issue issue : issues) {
                writer.write(issue.toCsvLine());
                writer.newLine();
            }
        } catch (IOException e) {
            System.err.println("Error saving issues to file: " + e.getMessage());
        }
    }

    private void loadFromFile() {
        File file = new File(filePath);
        if (!file.exists()) {
            return;
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (!line.isBlank()) {
                    issues.add(Issue.fromCsvLine(line));
                }
            }
        } catch (IOException e) {
            System.err.println("Error loading issues from file: " + e.getMessage());
        }
    }
}
