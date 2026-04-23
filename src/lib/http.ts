export async function readApiPayload<T>(response: Response): Promise<T> {
  const payload = (await response.json().catch(() => null)) as
    | T
    | { message?: string }
    | null;

  if (!response.ok) {
    throw new Error(
      payload && typeof payload === "object" && "message" in payload
        ? payload.message || "请求失败，请稍后再试。"
        : "请求失败，请稍后再试。",
    );
  }

  return payload as T;
}
