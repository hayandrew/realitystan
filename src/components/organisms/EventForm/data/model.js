const model = {
  steps: {
    "Venue": [
      {
        key: "venue",
        label: "Venue",
        type: "input",
        props: {
          type: "text",
          id: "venue",
          required: true
        }
      }
    ],
    "Occurence": [
      {
        key: "start_time",
        label: "Start Time",
        type: "input",
        props: {
          type: "text",
          id: "start_time",
          required: true
        }
      },
      {
        key: "end_time",
        label: "End Time",
        type: "input",
        props: {
          type: "text",
          id: "end_time",
          required: true
        }
      }
    ],
    "Details": [
      {
        key: "event_type",
        label: "Event Type",
        type: "input",
        props: {
          type: "text",
          id: "event_type",
          required: true
        }
      },
      {
        key: "specials",
        label: "Specials",
        type: "input",
        props: {
          type: "text",
          id: "specials",
          required: true
        }
      }
    ],
    "Description": [
      {
        key: "title",
        label: "Title (optional)",
        type: "input",
        props: {
          type: "text",
          id: "title"
        }
      },
      {
        key: "desc",
        label: "Description (optional)",
        type: "textarea",
        props: {
          type: "text",
          id: "desc",
          required: true
        }
      }
    ]
  }
}

export default model