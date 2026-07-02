package civicpulse;

/**
 * Thrown when an operation references an Issue ID that does not exist.
 */
public class IssueNotFoundException extends Exception {
    public IssueNotFoundException(String message) {
        super(message);
    }
}
