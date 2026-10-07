import os
import sys

# Make the `eval` package importable when running pytest from agent_v1/.
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
