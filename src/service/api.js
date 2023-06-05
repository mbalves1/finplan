export async function getReleases() {
  return await fetch('https://backend-finplan.vercel.app/api/services');
}

export async function postReleases(payload) {
  const response = await fetch('https://backend-finplan.vercel.app/api/services', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  console.log("data", response);
  return data;
}

export async function deleteRelease(id) {
  console.log(">>", id);
  return await fetch(`https://backend-finplan.vercel.app/api/services/${id}`, {
    method: 'DELETE',
  });
}
