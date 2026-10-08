const steps = [
  {
    number: "1",
    title: "Report a lost document",
    description:
      "Provide the document details so RetroDoc can compare your report with documents received at stations.",
  },
  {
    number: "2",
    title: "Someone reports a found document",
    description:
      "A finder reports the document and takes it to the selected RetroDoc station.",
  },
  {
    number: "3",
    title: "RetroDoc identifies a possible match",
    description:
      "The system compares relevant document information and notifies the possible owner.",
  },
  {
    number: "4",
    title: "The owner confirms",
    description:
      "The person who reported the lost document confirms whether the possible match appears to be theirs.",
  },
  {
    number: "5",
    title: "The station verifies",
    description:
      "The station officer checks the claimant's identity and supporting proof before releasing the document.",
  },
];

export default function HowItWorks() {
  return (
    <section className="card">
      <h2>How RetroDoc works</h2>

      <div className="timeline">
        {steps.map((step) => (
          <div className="timeline-item" key={step.number}>
            <div className="timeline-number">{step.number}</div>

            <div>
              <h3>{step.title}</h3>
              <p className="muted">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
