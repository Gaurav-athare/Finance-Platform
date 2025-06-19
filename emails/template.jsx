import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export default function EmailTemplate({
  userName = "User",
  type = "monthly-report",
  data = {},
}) {
  if (type === "monthly-report") {
    const month = data?.month ?? "this month";
    const stats = data?.stats ?? {};
    const insights = data?.insights ?? [];

    const totalIncome = stats.totalIncome ?? 0;
    const totalExpenses = stats.totalExpenses ?? 0;
    const net = totalIncome - totalExpenses;
    const byCategory = stats.byCategory ?? {};

    return (
      <Html>
        <Head />
        <Preview>Your Monthly Financial Report</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Monthly Financial Report</Heading>

            <Text style={styles.text}>Hello {userName},</Text>
            <Text style={styles.text}>
              Here's your financial summary for {month}:
            </Text>

            {/* Stats */}
            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.text}>Total Income</Text>
                <Text style={styles.heading}>${totalIncome}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Total Expenses</Text>
                <Text style={styles.heading}>${totalExpenses}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Net</Text>
                <Text style={styles.heading}>${net}</Text>
              </div>
            </Section>

            {/* Category Breakdown */}
            {Object.keys(byCategory).length > 0 && (
              <Section style={styles.section}>
                <Heading style={styles.heading}>Expenses by Category</Heading>
                {Object.entries(byCategory).map(([category, amount]) => (
                  <div key={category} style={styles.row}>
                    <Text style={styles.text}>{category}</Text>
                    <Text style={styles.text}>${amount}</Text>
                  </div>
                ))}
              </Section>
            )}

            {/* Insights */}
            {insights.length > 0 && (
              <Section style={styles.section}>
                <Heading style={styles.heading}>Welth Insights</Heading>
                {insights.map((insight, index) => (
                  <Text key={index} style={styles.text}>
                    • {insight}
                  </Text>
                ))}
              </Section>
            )}

            <Text style={styles.footer}>
              Thank you for using Welth. Keep tracking your finances for better
              financial health!
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }

  if (type === "budget-alert") {
    const percentageUsed = data?.percentageUsed ?? 0;
    const budgetAmount = data?.budgetAmount ?? 0;
    const totalExpenses = data?.totalExpenses ?? 0;
    const remaining = budgetAmount - totalExpenses;

    return (
      <Html>
        <Head />
        <Preview>Budget Alert</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Budget Alert</Heading>

            <Text style={styles.text}>Hello {userName},</Text>
            <Text style={styles.text}>
              You've used {percentageUsed.toFixed(1)}% of your monthly budget.
            </Text>

            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.text}>Budget Amount</Text>
                <Text style={styles.heading}>${budgetAmount}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Spent So Far</Text>
                <Text style={styles.heading}>${totalExpenses}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.text}>Remaining</Text>
                <Text style={styles.heading}>${remaining}</Text>
              </div>
            </Section>

            <Text style={styles.footer}>
              Stay on top of your budget to reach your financial goals!
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }

  // Fallback for unknown type
  return (
    <Html>
      <Head />
      <Preview>Notification</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.title}>Unknown Email Type</Heading>
          <Text style={styles.text}>
            This email template is not recognized. Please contact support.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// === Styles ===
const styles = {
  body: {
    backgroundColor: "#f6f9fc",
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
  },
  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  title: {
    color: "#1f2937",
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "24px",
  },
  heading: {
    color: "#1f2937",
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "12px",
  },
  text: {
    color: "#4b5563",
    fontSize: "16px",
    marginBottom: "12px",
  },
  section: {
    marginTop: "24px",
    padding: "20px",
    backgroundColor: "#f9fafb",
    borderRadius: "5px",
    border: "1px solid #e5e7eb",
  },
  statsContainer: {
    marginTop: "24px",
    padding: "20px",
    backgroundColor: "#f9fafb",
    borderRadius: "5px",
  },
  stat: {
    marginBottom: "16px",
    padding: "12px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #e5e7eb",
  },
  footer: {
    color: "#6b7280",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "24px",
    paddingTop: "16px",
    borderTop: "1px solid #e5e7eb",
  },
};
