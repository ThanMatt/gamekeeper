export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // :: New feature
        "fix", // :: Bug fix
        "docs", // :: Documentation
        "style", // :: Code style (formatting, missing semi-colons, etc)
        "refactor", // :: Code refactoring
        "perf", // :: Performance improvements
        "test", // :: Tests
        "chore", // :: Maintenance tasks
        "build", // :: Build system or external dependencies
        "ci", // :: CI configuration
        "revert", // :: Revert a previous commit
      ],
    ],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "scope-empty": [0], // :: Allow empty scope
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [0], // :: Allow any case for subject
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", 72],
    "body-leading-blank": [1, "always"],
    "body-max-line-length": [2, "always", 100],
    "footer-leading-blank": [1, "always"],
  },
};
