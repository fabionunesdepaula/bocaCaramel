#!/usr/bin/env python3
"""Pick once per boot. No timer, slideshow, image modification or carousel."""
from pathlib import Path
import secrets
import shutil

if __name__ == '__main__':
    folder = Path('/usr/share/maratona-background')
    source = secrets.choice([folder/'caramel-claro.png', folder/'caramel-espresso.png'])
    shutil.copyfile(source, folder/'maratona-common-wallpaper.png')
