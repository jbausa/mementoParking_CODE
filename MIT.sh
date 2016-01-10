for file in *.yml; do
  sed -i '# Copyright (c) 2016 Juan Bausá Arpón' "$file" &&
  sed -i '#' "$file" &&
  sed -i '# See the file license.txt for copying permission.' "$file"
done
