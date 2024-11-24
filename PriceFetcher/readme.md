# Support for multiple coins/tokens
Because I need to be able to execute automatic stop loss trades for multiple coins and tokens (e.g: SOL, ADA, SNEK, etc...),
I need a way to specify and keep adding such tokens and their configurations without having to restart the Azure Function.
It needs to be able to pick them up automatically.
To accomplish this, I propose:

- Saving the configuration in a tokens.json file in this repository
- Having Azure App Configuration sync with the tokens.json file
- Having Azure Function App read from Azure App Configuration using the IOptionsSnapshot<T> pattern

TODO:
- For now, it makes sense to update the Azure Function configuration manually and restart it
- When a change is made to the tokens.json file, we should have a github workflow that detects it and updates Azure App Configuration automatically.