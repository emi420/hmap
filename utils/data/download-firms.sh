now=`date`
wget -O - https://firms.modaps.eosdis.nasa.gov/data/active_fire/c6/csv/MODIS_C6_South_America_24h.csv > /var/www/html/bomberoslagranja.org/public_html/dev-dataMODIS_C6_South_America_24h.csv
wget -O - https://firms.modaps.eosdis.nasa.gov/data/active_fire/viirs/csv/VNP14IMGTDL_NRT_South_America_24h.csv > /var/www/html/bomberoslagranja.org/public_html/dev-data/VNP14IMGTDL_NRT_South_America_24h.csv
# wget -O -  >> /var/www/html/bomberoslagranja.org/public_html/dev-data/VNP14IMGTDL_NRT_South_America_24h.csv
echo "FIRMS updated: $now" >> /var/www/html/bomberoslagranja.org/public_html/dev-data/FIRMS.log
