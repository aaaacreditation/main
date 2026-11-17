-- Nov 2026 (client feedback): the Global Medical City and Dr. Paul's healthcare
-- testimonial cards had each other's video. YouTube titles confirm:
--   zpzh6QtLdSI = "Global Medical City: Success Story of the First Accredited Hospital in Egypt"
--   AZd-Wi2o5UI = "Dr. Paul Clinic's Experience with AAA Accreditation"
-- Guarded: a row is only changed while it still holds the wrong link, so an
-- edit made in the admin is never overwritten.
UPDATE "CaseStudy" SET "videoUrl" = 'https://www.youtube.com/watch?v=zpzh6QtLdSI', "updatedAt" = NOW()
 WHERE "slug" = 'global-medical-city-healthcare' AND "videoUrl" = 'https://www.youtube.com/watch?v=AZd-Wi2o5UI';
UPDATE "CaseStudy" SET "videoUrl" = 'https://www.youtube.com/watch?v=AZd-Wi2o5UI', "updatedAt" = NOW()
 WHERE "slug" = 'dr-pauls-healthcare' AND "videoUrl" = 'https://www.youtube.com/watch?v=zpzh6QtLdSI';
