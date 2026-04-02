"""
Security utilities: JWT verification, Clerk token validation.
"""
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import httpx
from config import settings

bearer_scheme = HTTPBearer()


async def verify_clerk_token(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
) -> dict:
    """Verify a Clerk session JWT and return the decoded payload."""
    token = credentials.credentials
    try:
        async with httpx.AsyncClient() as client:
            res = await client.get(
                "https://api.clerk.com/v1/sessions",
                headers={"Authorization": f"Bearer {settings.CLERK_SECRET_KEY}"},
                params={"session_token": token},
            )
            if res.status_code != 200:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
            return res.json()
    except httpx.HTTPError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)


CurrentUser = Depends(verify_clerk_token)
