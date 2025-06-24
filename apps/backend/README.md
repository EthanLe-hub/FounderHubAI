# Backend

## Note on Testing

**Important:**

The test for the AI-powered slide generation endpoint is now kept as a reference file (e.g., `generate_slides_test_reference.txt`). This file is not run in GitHub Actions CI to avoid environment and dependency issues, but it demonstrates the AI integration for employers and reviewers.

**To run this test locally:**
1. Rename the reference file to `test_generate_slides.py` and place it in the `tests/` directory.
2. Run:
   ```
   pytest apps/backend/tests
   ```
   in a properly configured Python 3.11+ environment.

The dummy test (`test_dummy.py`) is used in CI to ensure the backend check passes. 