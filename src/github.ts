export async function isSponsoring(targetUsername: string): Promise<boolean> {
  const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
  if (!token) {
    return false;
  }
  const query = `
    query IsViewerSponsoringUser($login: String!) {
      user(login: $login) {
        sponsorshipForViewerAsSponsor {
          createdAt
          isOneTimePayment
          tier {
            monthlyPriceInDollars
          }
        }
      }
    }
  `;
  const variables = {
    login: targetUsername,
  };
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  const result = await response.json();
  if (!result.ok) {
    return false;
  }
  const sponsorship = result.data?.user?.sponsorshipForViewerAsSponsor;
  return !!sponsorship;
}
