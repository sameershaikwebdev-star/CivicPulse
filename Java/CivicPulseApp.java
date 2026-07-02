package civicpulse;

import java.util.List;
import java.util.Scanner;

/**
 * Console entry point for the CivicPulse Issue Reporting System.
 * A menu-driven app that lets citizens report civic issues (potholes,
 * water supply problems, broken streetlights, etc.) and lets an
 * administrator track and update their status.
 */
public class CivicPulseApp {

    private static final Scanner scanner = new Scanner(System.in);
    private static final IssueManager manager = new IssueManager("civic_issues.txt");

    public static void main(String[] args) {
        printBanner();
        boolean running = true;

        while (running) {
            printMenu();
            int choice = readInt("Enter your choice: ");

            switch (choice) {
                case 1 -> reportIssue();
                case 2 -> viewAllIssues();
                case 3 -> updateIssueStatus();
                case 4 -> filterIssues();
                case 5 -> viewSummaryReport();
                case 6 -> viewSortedByPriority();
                case 0 -> {
                    running = false;
                    System.out.println("Thank you for using CivicPulse. Goodbye!");
                }
                default -> System.out.println("Invalid choice. Please try again.");
            }
        }
        scanner.close();
    }

    private static void printBanner() {
        System.out.println("========================================");
        System.out.println("   CivicPulse - Issue Reporting System   ");
        System.out.println("========================================");
    }

    private static void printMenu() {
        System.out.println("\n--- MENU ---");
        System.out.println("1. Report New Issue");
        System.out.println("2. View All Issues");
        System.out.println("3. Update Issue Status");
        System.out.println("4. Filter Issues");
        System.out.println("5. View Summary Report");
        System.out.println("6. View Issues by Priority");
        System.out.println("0. Exit");
    }

    private static void reportIssue() {
        System.out.println("\n--- Report New Issue ---");
        String title = readLine("Title: ");
        String description = readLine("Description: ");
        IssueCategory category = readCategory();
        String location = readLine("Location: ");
        String reporterName = readLine("Your Name: ");
        int priority = readInt("Priority (1-Low to 5-High): ");

        Issue issue = manager.addIssue(title, description, category, location, reporterName, priority);
        System.out.println("Issue reported successfully! Assigned ID: " + issue.getId());
    }

    private static void viewAllIssues() {
        System.out.println("\n--- All Reported Issues ---");
        List<Issue> all = manager.getAllIssues();
        if (all.isEmpty()) {
            System.out.println("No issues reported yet.");
            return;
        }
        all.forEach(System.out::println);
    }

    private static void updateIssueStatus() {
        int id = readInt("Enter Issue ID to update: ");
        System.out.println("Select new status: 1-PENDING  2-IN_PROGRESS  3-RESOLVED  4-REJECTED");
        int choice = readInt("Choice: ");
        IssueStatus status = mapToStatus(choice);

        if (status == null) {
            System.out.println("Invalid status choice.");
            return;
        }

        try {
            manager.updateStatus(id, status);
            System.out.println("Issue " + id + " updated to " + status);
        } catch (IssueNotFoundException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    private static void filterIssues() {
        System.out.println("Filter by: 1-Status   2-Category");
        int choice = readInt("Choice: ");
        List<Issue> result;

        if (choice == 1) {
            System.out.println("1-PENDING  2-IN_PROGRESS  3-RESOLVED  4-REJECTED");
            IssueStatus status = mapToStatus(readInt("Status: "));
            if (status == null) {
                System.out.println("Invalid status.");
                return;
            }
            result = manager.filterByStatus(status);
        } else if (choice == 2) {
            IssueCategory category = readCategory();
            result = manager.filterByCategory(category);
        } else {
            System.out.println("Invalid choice.");
            return;
        }

        if (result.isEmpty()) {
            System.out.println("No matching issues found.");
        } else {
            result.forEach(System.out::println);
        }
    }

    private static void viewSortedByPriority() {
        System.out.println("\n--- Issues Sorted by Priority (High to Low) ---");
        List<Issue> sorted = manager.sortByPriorityDesc();
        if (sorted.isEmpty()) {
            System.out.println("No issues available.");
            return;
        }
        sorted.forEach(System.out::println);
    }

    private static void viewSummaryReport() {
        System.out.println("\n--- Summary Report ---");
        System.out.println("By Status:");
        manager.getStatusSummary().forEach((status, count) ->
                System.out.println("  " + status + ": " + count));

        System.out.println("By Category:");
        manager.getCategorySummary().forEach((category, count) ->
                System.out.println("  " + category + ": " + count));
    }

    private static IssueStatus mapToStatus(int choice) {
        return switch (choice) {
            case 1 -> IssueStatus.PENDING;
            case 2 -> IssueStatus.IN_PROGRESS;
            case 3 -> IssueStatus.RESOLVED;
            case 4 -> IssueStatus.REJECTED;
            default -> null;
        };
    }

    private static IssueCategory readCategory() {
        System.out.println("Select Category:");
        IssueCategory[] categories = IssueCategory.values();
        for (int i = 0; i < categories.length; i++) {
            System.out.println((i + 1) + ". " + categories[i]);
        }
        int choice = readInt("Choice: ");
        if (choice < 1 || choice > categories.length) {
            System.out.println("Invalid choice, defaulting to OTHER.");
            return IssueCategory.OTHER;
        }
        return categories[choice - 1];
    }

    private static int readInt(String prompt) {
        while (true) {
            System.out.print(prompt);
            String input = scanner.nextLine().trim();
            try {
                return Integer.parseInt(input);
            } catch (NumberFormatException e) {
                System.out.println("Please enter a valid whole number.");
            }
        }
    }

    private static String readLine(String prompt) {
        System.out.print(prompt);
        return scanner.nextLine().trim();
    }
}
