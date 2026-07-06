# AI Critique

During this assignment, working with AI to create test documents showed both its strengths and weaknesses. AI was very helpful in organizing information and creating test cases quickly, but it also missed some important points.

One major issue was that the AI did not identify some boundary conditions. For example, it did not consider maximum lengths for user names, passwords, or the maximum number of items in a cart. Because these limits were not clearly stated in the requirements, the AI only followed the given information and did not think about possible system limits. As a result, some edge cases could be missed, such as UI problems caused by entering an extremely long user name.

Another weakness was that the AI sometimes assumed that testing at different system layers was unnecessary. For example, it treated password confirmation and input validation as frontend features only and did not consider what might happen if a user bypassed the frontend and sent requests directly to the backend. This happened because the AI generally assumes that the system works as intended unless negative scenarios are clearly requested.

The most important lesson from this experience is that AI should be used as a supporting tool rather than a final source of truth. AI is useful for creating structured documents and converting requirements into test cases, but human testers are still responsible for finding hidden risks, thinking about unusual user behavior, checking database integrity, and identifying security issues such as duplicate email validation or unauthorized data changes. Human judgment is necessary to cover the gaps that AI may overlook.
