const DEFAULT_TIMEOUT = 12_000;

export function getSoultraceApiUrl() {
  return process.env.SOULTRACE_API_URL || "https://soultrace.app/api/agent";
}

export function getSoultraceTimeoutMs() {
  const rawValue = Number(process.env.SOULTRACE_TIMEOUT_MS);

  if (!Number.isFinite(rawValue) || rawValue <= 0) {
    return DEFAULT_TIMEOUT;
  }

  return rawValue;
}

export function isSoultraceMockMode() {
  return process.env.SOULTRACE_MOCK_MODE === "1";
}
